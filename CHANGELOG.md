# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-11-04

### Added
- Initial MVP release with complete resume analysis workflow
- File upload component with drag-and-drop support for PDF and DOCX files (max 8 MB)
- File validation with user-friendly error messages via Toast notifications
- Interactive section selection with 9 resume sections (Summary, Skills, Experience, Education, Projects, Certifications, Publications, Awards, Volunteering)
- "Proceed without sections" option for flexible analysis
- Mock AI analysis simulation with 700ms delay
- Comprehensive analysis modal with 7 sections:
  - Overview summary
  - Color-coded compatibility score with progress bar (red/yellow/green)
  - Skills displayed as chips
  - Target industries displayed as chips
  - Potential misreads section
  - Actionable suggestions list
  - Analysis metadata (timestamp, file info)
- LocalStorage persistence for analysis history using `crypto.randomUUID()`
- Responsive design with PrimeFlex grid (70/30 desktop split, stacked mobile)
- Empty state messaging to guide new users
- Enhanced header with icon, branding, and version badge
- Accessibility features:
  - ARIA labels on interactive elements
  - `role="status"` and `aria-live="polite"` for dynamic content
  - Keyboard navigation with `:focus-visible` styling
  - Screen reader support throughout
- Comprehensive project documentation in README.md
- Zustand state management with 12 actions and centralized Toast reference
- Three action buttons: Analyze Resume, View Analysis, Save Analysis
- Status block showing analysis state (analyzing/ready/none)
- Tooltips on disabled buttons explaining requirements

### Changed
- Updated README from Vite template to comprehensive project documentation
- Enhanced Header component with improved layout and styling
- Improved focus visibility for keyboard users
- Added smooth transitions to interactive elements

### Fixed
- TypeScript compilation errors with PrimeReact imports
- Toast ref typing compatibility issues
- Button severity prop type mismatches

[0.1.0]: https://github.com/JoshAaronLevy/resume-buddy/releases/tag/v0.1.0
