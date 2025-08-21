# GitHub Pages Setup Guide

Follow these steps to deploy your Healing Synergies website to GitHub Pages:

## Step 1: Push to GitHub

First, push your code to the GitHub repository:

```bash
git push -u origin main
```

## Step 2: Enable GitHub Pages

1. Go to your GitHub repository: https://github.com/Benjination/Healing-Synergies
2. Click on the **Settings** tab
3. Scroll down to **Pages** in the left sidebar
4. Under **Source**, select **GitHub Actions**
5. The workflow file (`.github/workflows/deploy.yml`) will automatically deploy your site

## Step 3: Access Your Website

Once deployed, your website will be available at:
**https://benjination.github.io/Healing-Synergies/**

## Step 4: Custom Domain (Optional)

If you want to use a custom domain:

1. In the Pages settings, add your custom domain (e.g., `healingsynergies.com`)
2. Update your DNS records with your domain provider:
   - Add a CNAME record pointing to `benjination.github.io`
   - Or add A records pointing to GitHub's IP addresses

## Step 5: SSL Certificate

GitHub Pages automatically provides SSL certificates for both GitHub.io domains and custom domains.

## Updating Your Website

To update your website:

1. Make changes to your files
2. Commit and push to the main branch:
   ```bash
   git add .
   git commit -m "Update website content"
   git push origin main
   ```
3. The site will automatically rebuild and deploy

## Features Included

✅ **Responsive Design** - Works on all devices  
✅ **SEO Optimized** - Meta tags, sitemap, robots.txt  
✅ **Interactive Gallery** - Click to view images  
✅ **Contact Forms** - Ready for form handling service  
✅ **Newsletter Signup** - Ready for email service integration  
✅ **Social Media Links** - Facebook and YouTube  
✅ **Fast Loading** - Optimized images and code  
✅ **Accessibility** - Screen reader friendly  

## Next Steps

1. **Form Integration**: Connect contact and newsletter forms to services like Formspree or Netlify Forms
2. **Analytics**: Add Google Analytics for visitor tracking
3. **Performance**: Optimize images further if needed
4. **Content**: Add blog functionality if desired
5. **SEO**: Submit sitemap to Google Search Console

## Support

If you need help with any of these steps, refer to the [GitHub Pages documentation](https://docs.github.com/en/pages) or reach out for assistance.
