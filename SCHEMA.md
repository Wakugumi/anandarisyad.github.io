# Configuration Schema Documentation

Your resume website uses a comprehensive JSON schema system for type safety, validation, and IDE support. This document explains how to use and extend the configuration system.

## Schema Files

- **`src/config.json`** - Main configuration file with your data
- **`src/config.schema.json`** - JSON Schema definition
- **`src/types/config.ts`** - TypeScript type definitions
- **`src/lib/config.ts`** - Configuration utilities
- **`scripts/validate-config.js`** - Validation script

## Development Benefits

### IDE Support
When you edit `config.json`, your IDE will provide:
- **Auto-completion** for property names
- **Type checking** for values
- **Validation** against the schema
- **Documentation** tooltips

### Type Safety
All configuration access is type-safe in TypeScript:
```typescript
import config from '../lib/config';
// config is fully typed - no more guessing!
const name = config.personal.name; // ✅ Type-safe
```

## 📝 Configuration Sections

### Site Configuration
```json
{
  "site": {
    "title": "Your Resume",           // Required
    "description": "Professional...", // Required  
    "author": "Your Name",           // Required
    "email": "you@example.com",      // Optional, validated as email
    "phone": "+1 (555) 123-4567",   // Optional
    "location": "City, Country",     // Optional
    "website": "https://...",        // Optional, validated as URL
    "linkedin": "https://...",       // Optional, validated as URL
    "github": "https://..."          // Optional, validated as URL
  }
}
```

### Personal Information
```json
{
  "personal": {
    "name": "John Doe",              // Required
    "title": "Software Engineer",   // Required
    "summary": "Experienced...",     // Optional
    "avatar": "https://...",         // Optional, URL to image
    "location": "City, Country"      // Optional
  }
}
```

### Experience Entries
```json
{
  "experience": [
    {
      "company": "Company Name",     // Required
      "position": "Job Title",       // Required
      "duration": "2 Years",         // Required
      "startFrom": "Jan 2022",       // Optional
      "endAt": "Present",            // Optional
      "location": "City, Country",   // Optional
      "description": [               // Optional
        "Achievement 1",
        "Achievement 2"
      ],
      "status": "current",           // Optional: completed|current|upcoming
      "skills": [                    // Optional: skill badges
        {
          "title": "React",          // Required
          "icon": "⚛️",              // Optional
          "iconType": "emoji",       // Optional: emoji|text|svg|image|heroicon|class
          "iconPosition": "left",    // Optional: left|right
          "color": "blue",           // Optional: emerald|amber|red|blue|gray|purple|indigo
          "variant": "filled",       // Optional: filled|outlined|soft
          "href": "https://..."      // Optional: make badge clickable
        }
      ]
    }
  ]
}
```

### Skills
```json
{
  "skills": {
    "languages": ["JavaScript", "Python"],     // Array of strings
    "frameworks": ["React", "Vue.js"],         // Array of strings
    "tools": ["Docker", "Git"],                // Array of strings
    "databases": ["PostgreSQL", "MongoDB"]     // Array of strings
    // You can add custom categories too!
  }
}
```

### Projects
```json
{
  "projects": [
    {
      "name": "Project Name",        // Required
      "description": "About...",     // Required
      "technologies": ["React"],     // Optional array
      "github": "https://...",       // Optional URL
      "demo": "https://...",         // Optional URL
      "image": "https://...",        // Optional image URL
      "status": "completed"          // Optional: completed|in-progress|planned
    }
  ]
}
```

### Timeline
```json
{
  "timeline": [
    {
      "id": "unique-id",             // Optional
      "date": "2022 - Present",      // Required
      "title": "Event Title",        // Required
      "description": "Details...",   // Optional
      "status": "current",           // Optional: completed|current|upcoming
      "icon": "🎓",                  // Optional: emoji, text, or path
      "color": "bg-blue-500"         // Optional: custom CSS class
    }
  ]
}
```

### Theme Configuration
```json
{
  "theme": {
    "colors": {
      "primary": "#3B82F6",          // Hex color
      "secondary": "#64748B",        // Hex color
      "accent": "#10B981",           // Hex color
      "background": "#FFFFFF",       // Hex color
      "text": "#1F2937"              // Hex color
    },
    "fonts": {
      "heading": "Inter, sans-serif", // Font family
      "body": "Inter, sans-serif",    // Font family
      "mono": "JetBrains Mono"        // Font family
    }
  }
}
```

## 🔍 Validation Commands

### Validate Configuration
```bash
npm run validate
```

### Type Check (Astro/TypeScript)
```bash
npm run type-check
```

### Development Server (with live validation)
```bash
npm run dev
```

## 🎨 Using Configuration in Components

### Basic Usage
```astro
---
import config from '../lib/config';
const { personal, site } = config;
---

<h1>{personal.name}</h1>
<p>{personal.title}</p>
<a href={`mailto:${site.email}`}>{site.email}</a>
```

### Helper Functions
```astro
---
import { getPersonal, getSite } from '../lib/config';
const personal = getPersonal();
const site = getSite();
---
```

### With Components
```astro
---
import Badge from './baseline/Badge.astro';
import Timeline from './baseline/Timeline.astro';
import { getWorkExperience, getTimelineData } from '../lib/config';

const experience = getWorkExperience();
const timeline = getTimelineData();
---

<!-- Use experience data with Timeline -->
<Timeline items={timeline} variant="detailed" />

<!-- Use skill badges from experience -->
{experience.map(job => 
  job.skills?.map(skill => 
    <Badge 
      text={skill.title}
      icon={skill.icon}
      iconType={skill.iconType}
      color={skill.color}
    />
  )
)}
```

## Extending the Schema

### Add New Fields
1. Update `src/config.schema.json`
2. Update `src/types/config.ts`
3. Add to your `src/config.json`
4. Run validation: `npm run validate`

### Example: Adding Social Media
```json
// In config.schema.json, add to site properties:
"social": {
  "type": "object",
  "properties": {
    "twitter": { "type": "string", "format": "uri" },
    "instagram": { "type": "string", "format": "uri" }
  }
}

// In types/config.ts, add to SiteConfig:
social?: {
  twitter?: string;
  instagram?: string;
}

// In config.json:
"site": {
  "social": {
    "twitter": "https://twitter.com/username",
    "instagram": "https://instagram.com/username"
  }
}
```



## Common Issues

### Schema Validation Errors
- **Missing required fields**: Add all required properties
- **Invalid URLs**: Ensure URLs start with `http://` or `https://`
- **Invalid emails**: Check email format
- **Wrong types**: Ensure strings are strings, arrays are arrays

### TypeScript Errors
- **Import issues**: Check file paths in imports
- **Type mismatches**: Ensure your data matches the schema types
- **Missing properties**: Add optional properties or update types

## Tools & Resources

- [JSON Schema Documentation](https://json-schema.org/)
- [VS Code JSON Schema Support](https://code.visualstudio.com/docs/languages/json#_json-schemas-and-settings)
- [Astro Documentation](https://docs.astro.build/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)