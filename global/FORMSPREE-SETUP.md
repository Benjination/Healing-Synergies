# Formspree Setup Guide for Healing Synergies

## What is Formspree?

Formspree is a form backend service that allows you to collect form submissions from your static website without needing your own server. It's perfect for GitHub Pages sites like yours.

## Setup Steps

### 1. Create a Formspree Account

1. Go to [https://formspree.io](https://formspree.io)
2. Sign up for a free account using your `healingsynergies@gmail.com` email
3. Verify your email address

### 2. Create Your Contact Form

You need to create **one form** in Formspree:

#### Contact Form
1. Click "New Form" in your Formspree dashboard
2. Name it: "Healing Synergies Contact Form"
3. Copy the form ID (it looks like `xpzgkrdw` or similar)

### 3. Update Your Website

Replace the placeholder form ID in your `index.html` file:

```html
<!-- Contact Form -->
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Replace:**
- `YOUR_FORM_ID` with your contact form ID

### 4. Form Configuration Options

In your Formspree dashboard, you can configure:

#### Contact Form Settings:
- **Email notifications**: Get emails when someone submits
- **Thank you page**: Redirect to a custom thank you page
- **Spam protection**: Enable reCAPTCHA
- **Auto-reply**: Send automatic responses to form submitters

### 5. Custom Thank You Page (Optional)

Create a custom thank you page for better user experience:

#### Contact Thank You Page (`thank-you-contact.html`):
```html
<!DOCTYPE html>
<html>
<head>
    <title>Thank You - Healing Synergies</title>
    <meta http-equiv="refresh" content="3;url=../index.html">
</head>
<body>
    <h1>Thank You!</h1>
    <p>Your message has been sent. We'll get back to you soon!</p>
    <p>Redirecting to homepage in 3 seconds...</p>
</body>
</html>
```

### 6. Advanced Configuration

Add these hidden fields to your contact form for better organization:

#### Contact Form:
```html
<input type="hidden" name="_subject" value="New Contact from Healing Synergies Website">
<input type="hidden" name="_next" value="https://benjination.github.io/Healing-Synergies/thank-you-contact.html">
```

### 7. Testing Your Form

1. Deploy your site to GitHub Pages
2. Submit a test form using your own email
3. Check that you receive the email
4. Verify the thank you page works correctly

### 8. Form Limits

**Free Plan:**
- 50 submissions per month
- Basic spam protection
- Email notifications

**Paid Plans:**
- Unlimited submissions
- Advanced spam protection
- File uploads
- Custom redirects

### 9. Email Integration (Optional)

If you want to collect emails for marketing, you can integrate with:
- **MailChimp**: For email marketing campaigns
- **ConvertKit**: For course creators and bloggers
- **Zapier**: To connect with other services

### 10. Monitoring

In your Formspree dashboard you can:
- View all form submissions
- Export data as CSV
- Set up webhooks for real-time notifications
- Monitor spam attempts

## Quick Start Commands

After getting your form ID from Formspree:

```bash
# Update the form action URL in index.html
# Replace YOUR_FORM_ID with actual ID

# Commit and push changes
git add .
git commit -m "Connect contact form to Formspree backend"
git push origin main
```

## Support

- **Formspree Documentation**: [https://help.formspree.io](https://help.formspree.io)
- **Email**: team@formspree.io
- **Status Page**: [https://status.formspree.io](https://status.formspree.io)

Your contact form is now ready to collect real submissions from your website visitors!
