#!/usr/bin/env node

/**
 * Config Validation Script
 * 
 * This script validates your config.json against the schema
 * Usage: node scripts/validate-config.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Simple JSON Schema validator (you could use ajv for more robust validation)
function validateSchema(data, schema) {
  const errors = [];
  
  // Check required fields
  if (schema.required) {
    for (const field of schema.required) {
      if (!(field in data)) {
        errors.push(`Missing required field: ${field}`);
      }
    }
  }
  
  // Check properties
  if (schema.properties) {
    for (const [key, value] of Object.entries(data)) {
      const propSchema = schema.properties[key];
      if (propSchema) {
        if (propSchema.type === 'string' && typeof value !== 'string') {
          errors.push(`Field '${key}' should be a string, got ${typeof value}`);
        }
        if (propSchema.type === 'array' && !Array.isArray(value)) {
          errors.push(`Field '${key}' should be an array, got ${typeof value}`);
        }
        if (propSchema.format === 'email' && typeof value === 'string' && !value.includes('@')) {
          errors.push(`Field '${key}' should be a valid email address`);
        }
        if (propSchema.format === 'uri' && typeof value === 'string' && !value.startsWith('http')) {
          errors.push(`Field '${key}' should be a valid URI`);
        }
      }
    }
  }
  
  return errors;
}

function main() {
  try {
    // Load config and schema
    const configPath = path.join(__dirname, '..', 'src', 'config.json');
    const schemaPath = path.join(__dirname, '..', 'src', 'config.schema.json');
    
    if (!fs.existsSync(configPath)) {
      console.error('❌ config.json not found at:', configPath);
      process.exit(1);
    }
    
    if (!fs.existsSync(schemaPath)) {
      console.error('❌ config.schema.json not found at:', schemaPath);
      process.exit(1);
    }
    
    const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
    const schema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
    
    console.log('🔍 Validating config.json against schema...\n');
    
    // Basic validation
    const errors = validateSchema(config, schema);
    
    if (errors.length === 0) {
      console.log('✅ Configuration is valid!');
      console.log('\n📊 Configuration summary:');
      console.log(`   Name: ${config.personal?.name || 'Not set'}`);
      console.log(`   Title: ${config.personal?.title || 'Not set'}`);
      console.log(`   Experience entries: ${config.experience?.length || 0}`);
      console.log(`   Education entries: ${config.education?.length || 0}`);
      console.log(`   Projects: ${config.projects?.length || 0}`);
      console.log(`   Timeline entries: ${config.timeline?.length || 0}`);
    } else {
      console.log('❌ Configuration validation failed:');
      errors.forEach(error => console.log(`   • ${error}`));
      process.exit(1);
    }
    
  } catch (error) {
    console.error('❌ Error validating configuration:', error.message);
    process.exit(1);
  }
}

// Run main function
main();

export { validateSchema };