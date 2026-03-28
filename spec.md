# Leelaz Art By Pooja Rathore

## Current State
New project. No existing application files.

## Requested Changes (Diff)

### Add
- Multi-page art portfolio website with React Router navigation
- Home page: full-width hero section with sketch background and "View Gallery" CTA
- Gallery page: masonry-style filterable grid with categories: Acrylic Painting, Landscapes, Oil Painting, Water Color, Abstract, Sketches
- About page: bio section + horizontal "My Process" timeline
- Commission/Booking page: form with Name, Email, Commission Type (dropdown), File Upload for reference photos; submissions stored in backend
- Contact page: form with Name, Email, Message fields, validation, and success state
- Sticky navigation with smooth page transitions
- Responsive layout (1 col mobile, 3 col desktop gallery)
- Minimalist gallery-white design, serif headings, sans-serif body
- Dark charcoal footer with social links

### Modify
- N/A (new project)

### Remove
- N/A (new project)

## Implementation Plan
1. Select blob-storage component for commission reference photo uploads
2. Generate Motoko backend with Commission Request data model (id, name, email, commissionType, referencePhotoUrl, timestamp, status)
3. Generate Contact Message data model (id, name, email, message, timestamp)
4. Frontend: React Router SPA with pages: Home, Gallery, About, Commissions, Contact
5. Gallery page: placeholder images per category, filter buttons, masonry CSS columns layout
6. Commission form: file upload via blob-storage, form submission to backend
7. Contact form: client-side validation, success message state
8. Responsive design with Tailwind breakpoints
9. Navigation with active states and smooth transitions
