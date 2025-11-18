# Accessibility Guide

This document outlines the accessibility features implemented in this application and best practices for maintaining accessibility standards.

## Table of Contents

- [Overview](#overview)
- [Built-in Accessibility Features](#built-in-accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [ARIA Live Regions](#aria-live-regions)
- [Semantic HTML](#semantic-html)
- [Color and Contrast](#color-and-contrast)
- [Testing Accessibility](#testing-accessibility)
- [Best Practices](#best-practices)
- [Resources](#resources)

## Overview

This application is built with accessibility (a11y) as a first-class concern, following WCAG 2.1 Level AA guidelines. All developers should be familiar with these accessibility features and best practices.

**Accessibility Goals:**

- Support keyboard-only navigation
- Provide screen reader compatibility
- Maintain sufficient color contrast
- Use semantic HTML
- Include ARIA attributes where appropriate
- Ensure all interactive elements are focusable and labeled

## Built-in Accessibility Features

### 1. Skip to Main Content Link

A "Skip to main content" link appears when keyboard users press Tab, allowing them to bypass repetitive navigation.

**Location:** `index.html:89`

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

**CSS:** `src/assets/styles/index.css:21`

The skip link is visually hidden until focused, then appears at the top of the page.

### 2. Enhanced Focus Styles

All interactive elements have visible focus indicators for keyboard navigation.

**CSS:** `src/assets/styles/index.css:26`

```css
*:focus-visible {
  @apply outline-2 outline-offset-2 outline-blue-600;
}
```

### 3. Semantic HTML Structure

The application uses proper semantic HTML elements:

- `<header>` for page header (src/components/layout/Header.tsx:6)
- `<main>` for main content (src/components/layout/Layout.tsx:16)
- `<footer>` for page footer
- `<nav>` for navigation (src/components/layout/Header.tsx:14)
- `<article>`, `<section>` where appropriate

### 4. Proper ARIA Landmarks

The layout automatically includes proper ARIA landmarks:

- Main content has `id="main-content"` for skip link target
- Main element has `tabIndex={-1}` to allow programmatic focus

## Keyboard Navigation

### Essential Keyboard Shortcuts

| Key           | Action                                  |
| ------------- | --------------------------------------- |
| `Tab`         | Move focus to next interactive element  |
| `Shift + Tab` | Move focus to previous element          |
| `Enter`       | Activate buttons and links              |
| `Space`       | Activate buttons, toggle checkboxes     |
| `Escape`      | Close modals/dialogs                    |
| `Arrow Keys`  | Navigate within components (lists, etc) |

### Implementing Keyboard Support

When creating interactive components, ensure they support keyboard navigation:

```tsx
function CustomButton({ onClick, children }) {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onClick()
    }
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      aria-label="Descriptive label"
    >
      {children}
    </div>
  )
}
```

**Best Practice:** Use native HTML elements (`<button>`, `<a>`) whenever possible instead of custom implementations.

## Screen Reader Support

### ARIA Live Regions

Use the `LiveRegion` component to announce dynamic changes to screen readers.

**Component:** `src/components/ui/LiveRegion.tsx`

#### Basic Usage

```tsx
import { LiveRegion } from '@/components/ui/LiveRegion'

function NotificationExample() {
  const [message, setMessage] = useState('')

  const handleAction = () => {
    setMessage('Action completed successfully')
  }

  return (
    <>
      <button onClick={handleAction}>Perform Action</button>
      {message && <LiveRegion message={message} politeness="polite" />}
    </>
  )
}
```

#### Using the Hook

```tsx
import { useLiveRegion } from '@/components/ui/LiveRegion'

function FormExample() {
  const { announce, LiveRegionComponent } = useLiveRegion()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await submitForm()
      announce('Form submitted successfully', 'polite')
    } catch (error) {
      announce('Error: Form submission failed', 'assertive')
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>...</form>
      {LiveRegionComponent}
    </>
  )
}
```

#### Politeness Levels

- **`polite`**: Announces when user is idle (default)
- **`assertive`**: Interrupts immediately (use for errors)
- **`off`**: Disables announcements

### Visually Hidden Content

Use `VisuallyHidden` for content that should be read by screen readers but not visible:

```tsx
import { VisuallyHidden } from '@/components/ui/LiveRegion'

function IconButton() {
  return (
    <button>
      <TrashIcon />
      <VisuallyHidden>Delete item</VisuallyHidden>
    </button>
  )
}
```

## Focus Management

### Focus Utilities

**File:** `src/utils/focusManagement.ts`

#### Focus Trap for Modals

Trap focus within a modal or dialog:

```tsx
import { useEffect, useRef } from 'react'
import { trapFocus } from '@/utils/focusManagement'

function Modal({ isOpen, onClose, children }) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen || !modalRef.current) return

    const cleanup = trapFocus(modalRef.current)
    return cleanup
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <h2 id="modal-title">Modal Title</h2>
      {children}
      <button onClick={onClose}>Close</button>
    </div>
  )
}
```

#### Restore Focus

Store and restore focus when opening/closing modals:

```tsx
import { createFocusStore } from '@/utils/focusManagement'

function ModalContainer() {
  const [isOpen, setIsOpen] = useState(false)
  const focusStore = useRef(createFocusStore())

  const openModal = () => {
    focusStore.current.store()
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
    focusStore.current.restore()
  }

  return (
    <>
      <button onClick={openModal}>Open Modal</button>
      <Modal isOpen={isOpen} onClose={closeModal} />
    </>
  )
}
```

#### Get Focusable Elements

Find all focusable elements within a container:

```tsx
import { getFocusableElements } from '@/utils/focusManagement'

function NavigationComponent() {
  const navRef = useRef<HTMLElement>(null)

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      const focusable = getFocusableElements(navRef.current!)
      // Navigate to next item
    }
  }

  return (
    <nav ref={navRef} onKeyDown={handleKeyDown}>
      ...
    </nav>
  )
}
```

## Semantic HTML

### Use Appropriate HTML Elements

✅ **DO:**

```tsx
// Use button for actions
<button onClick={handleClick}>Submit</button>

// Use link for navigation
<a href="/about">About Us</a>

// Use heading hierarchy
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection</h3>

// Use semantic elements
<article>
  <header>...</header>
  <section>...</section>
  <footer>...</footer>
</article>
```

❌ **DON'T:**

```tsx
// Don't use div for buttons
<div onClick={handleClick}>Submit</div>

// Don't skip heading levels
<h1>Page Title</h1>
<h4>Section Title</h4> {/* Skip h2, h3 */}

// Don't use divs for everything
<div class="header">...</div>
<div class="main">...</div>
```

### Form Accessibility

Always label form inputs properly:

```tsx
// Option 1: Using <label> with htmlFor
<label htmlFor="email">Email Address</label>
<input id="email" type="email" name="email" required />

// Option 2: Wrapping input in label
<label>
  Email Address
  <input type="email" name="email" required />
</label>

// Option 3: Using aria-label
<input
  type="email"
  name="email"
  aria-label="Email Address"
  required
/>

// Add helpful descriptions
<label htmlFor="password">Password</label>
<input
  id="password"
  type="password"
  aria-describedby="password-hint"
  required
/>
<p id="password-hint">Must be at least 8 characters</p>

// Group related inputs
<fieldset>
  <legend>Shipping Address</legend>
  <label htmlFor="street">Street</label>
  <input id="street" type="text" />
  {/* ... */}
</fieldset>
```

### ARIA Attributes

Use ARIA attributes to enhance semantic meaning when HTML alone isn't sufficient:

```tsx
// Indicate loading state
<button aria-busy="true" disabled>
  <Spinner /> Loading...
</button>

// Indicate expanded/collapsed state
<button
  aria-expanded={isOpen}
  aria-controls="menu"
  onClick={() => setIsOpen(!isOpen)}
>
  Menu
</button>
<div id="menu" hidden={!isOpen}>...</div>

// Indicate current page in navigation
<nav>
  <a href="/" aria-current="page">Home</a>
  <a href="/about">About</a>
</nav>

// Indicate required fields
<input
  type="text"
  aria-required="true"
  required
/>

// Indicate invalid fields
<input
  type="email"
  aria-invalid={hasError}
  aria-describedby={hasError ? 'email-error' : undefined}
/>
{hasError && <p id="email-error" role="alert">Invalid email</p>}
```

## Color and Contrast

### WCAG Color Contrast Requirements

- **Normal text** (< 18pt): Minimum contrast ratio of 4.5:1
- **Large text** (≥ 18pt or 14pt bold): Minimum contrast ratio of 3:1
- **UI components**: Minimum contrast ratio of 3:1

### Using Tailwind Colors

Tailwind's default color palette generally meets WCAG AA standards. However, always test your color combinations:

✅ **Good Contrast:**

```tsx
// Dark text on light background
<div className="bg-white text-gray-900">...</div>

// Light text on dark background
<div className="bg-gray-900 text-white">...</div>

// Sufficient color contrast for interactive elements
<button className="bg-blue-600 text-white hover:bg-blue-700">
  Submit
</button>
```

❌ **Poor Contrast:**

```tsx
// Avoid low contrast combinations
<div className="bg-gray-200 text-gray-400">...</div> // Too subtle
<div className="bg-yellow-400 text-white">...</div> // Insufficient
```

### Don't Rely on Color Alone

Always use additional visual cues besides color:

```tsx
// Good: Uses icon + color
<div className="flex items-center gap-2 text-red-600">
  <ErrorIcon />
  <span>Error: Invalid input</span>
</div>

// Good: Uses text + color
<button
  className={`${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
>
  {isActive ? 'Active' : 'Inactive'}
</button>
```

## Testing Accessibility

### Automated Testing

#### ESLint Plugin

The project uses `eslint-plugin-jsx-a11y` to catch common accessibility issues during development.

**Config:** `.eslintrc.cjs`

#### Lighthouse Accessibility Audit

Run Lighthouse to check accessibility scores:

```bash
npm run build
npm run preview
# In Chrome DevTools: Run Lighthouse audit
```

**Target:** Accessibility score ≥ 90

### Manual Testing

#### Keyboard Navigation Test

1. **Tab through the entire page**
   - Can you reach all interactive elements?
   - Is the focus order logical?
   - Are focus indicators visible?

2. **Try common keyboard shortcuts**
   - Enter/Space on buttons
   - Escape to close modals
   - Arrow keys in lists/menus

3. **Test skip link**
   - Press Tab on page load
   - Press Enter on "Skip to main content"
   - Verify focus moves to main content

#### Screen Reader Testing

**Recommended Screen Readers:**

- **macOS:** VoiceOver (Cmd + F5)
- **Windows:** NVDA (free) or JAWS
- **Linux:** Orca

**Testing Checklist:**

- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Dynamic content changes are announced
- [ ] Navigation structure makes sense
- [ ] Buttons/links have descriptive text
- [ ] ARIA landmarks are present

#### Color Contrast Testing

**Tools:**

- Chrome DevTools: Inspect element > Accessibility panel
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Coolors Contrast Checker](https://coolors.co/contrast-checker)

### Browser Extensions

Recommended accessibility testing extensions:

1. **axe DevTools** - Comprehensive accessibility testing
2. **WAVE** - Visual accessibility evaluation
3. **Accessibility Insights** - Microsoft's accessibility tool
4. **Lighthouse** - Built into Chrome DevTools

## Best Practices

### 1. Images

✅ **DO:**

```tsx
// Provide descriptive alt text
<img src="/photo.jpg" alt="Team meeting in conference room" />

// Use empty alt for decorative images
<img src="/decorative-border.svg" alt="" />

// Use OptimizedImage component
<OptimizedImage
  src="/hero.jpg"
  alt="Product showcase"
  width={1200}
  height={630}
/>
```

❌ **DON'T:**

```tsx
// Don't omit alt attribute
<img src="/photo.jpg" />

// Don't use generic alt text
<img src="/photo.jpg" alt="image" />

// Don't put "image of" in alt text (redundant)
<img src="/photo.jpg" alt="Image of a conference room" />
```

### 2. Buttons and Links

✅ **DO:**

```tsx
// Use button for actions
<button onClick={handleSave}>Save Changes</button>

// Use link for navigation
<a href="/products">View Products</a>

// Provide descriptive text
<button onClick={handleDelete}>
  <TrashIcon />
  Delete Item
</button>
```

❌ **DON'T:**

```tsx
// Don't use link for actions
<a onClick={handleSave}>Save</a>

// Don't use non-descriptive text
<button>Click Here</button>

// Don't create icon-only buttons without labels
<button><TrashIcon /></button> // Missing label
```

### 3. Forms

✅ **DO:**

```tsx
// Always label inputs
<label htmlFor="name">Full Name</label>
<input id="name" type="text" />

// Group related fields
<fieldset>
  <legend>Contact Information</legend>
  {/* fields */}
</fieldset>

// Provide helpful error messages
{errors.email && (
  <p id="email-error" role="alert" className="text-red-600">
    {errors.email}
  </p>
)}
```

❌ **DON'T:**

```tsx
// Don't use placeholder as label
;<input type="text" placeholder="Name" /> // Missing label

// Don't use generic error messages
{
  hasError && <p>Error!</p>
}

// Don't forget required indicators
;<input type="email" required /> // Missing visible required indicator
```

### 4. Modals and Dialogs

✅ **DO:**

```tsx
<div
  role="dialog"
  aria-modal="true"
  aria-labelledby="dialog-title"
  aria-describedby="dialog-description"
>
  <h2 id="dialog-title">Confirm Action</h2>
  <p id="dialog-description">Are you sure you want to delete?</p>
  <button onClick={handleConfirm}>Confirm</button>
  <button onClick={handleCancel}>Cancel</button>
</div>
```

- Trap focus within the modal
- Restore focus when modal closes
- Allow Escape key to close
- Add backdrop that prevents interaction with content behind

### 5. Loading States

✅ **DO:**

```tsx
<button disabled={isLoading} aria-busy={isLoading}>
  {isLoading ? (
    <>
      <Spinner />
      <VisuallyHidden>Loading...</VisuallyHidden>
    </>
  ) : (
    'Submit'
  )}
</button>
```

### 6. Tables

✅ **DO:**

```tsx
<table>
  <caption>Sales Report Q1 2025</caption>
  <thead>
    <tr>
      <th scope="col">Month</th>
      <th scope="col">Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">January</th>
      <td>$10,000</td>
    </tr>
  </tbody>
</table>
```

## Resources

### Official Documentation

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [MDN Accessibility](https://developer.mozilla.org/en-US/docs/Web/Accessibility)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

### Tools

- [axe DevTools](https://www.deque.com/axe/devtools/)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [WAVE Web Accessibility Evaluation Tool](https://wave.webaim.org/)
- [Accessibility Insights](https://accessibilityinsights.io/)

### Testing

- [VoiceOver User Guide](https://support.apple.com/guide/voiceover/welcome/mac)
- [NVDA Screen Reader](https://www.nvaccess.org/)
- [Lighthouse CI Documentation](https://github.com/GoogleChrome/lighthouse-ci)

### Learning

- [A11y Project](https://www.a11yproject.com/)
- [WebAIM Articles](https://webaim.org/articles/)
- [Inclusive Components](https://inclusive-components.design/)
- [Deque University](https://dequeuniversity.com/)

---

**Remember:** Accessibility is not a feature—it's a fundamental requirement. Building accessible applications ensures everyone can use your software, regardless of their abilities or the devices they use.
