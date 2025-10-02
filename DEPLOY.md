# Quick Deployment Instructions

## Method 1: Upload via GitHub Web Interface (Easiest)

1. **Go to your repository**: https://github.com/popovicfilip9-ux/gmp-gdp-risk-assessment-tool

2. **Delete all existing files**:
   - Select all files in the repository
   - Click "Delete" and commit the deletion

3. **Upload new files**:
   - Click "Upload files" 
   - Drag and drop ALL files from this folder
   - Commit with message: "Enhanced GMP/GDP Risk Assessment Tool with new features"

4. **Enable GitHub Pages**:
   - Go to Settings → Pages
   - Set Source to "GitHub Actions"
   - Save

## Method 2: Command Line (If you have Git installed)

```bash
# Clone your repository
git clone https://github.com/popovicfilip9-ux/gmp-gdp-risk-assessment-tool.git
cd gmp-gdp-risk-assessment-tool

# Remove all existing files
git rm -r .
git commit -m "Clear repository for enhanced version"

# Copy all files from this deployment folder to your repository folder
# Then:
git add .
git commit -m "Enhanced GMP/GDP Risk Assessment Tool with new features"
git push origin main
```

## What's Included in This Enhanced Version

✅ **FMEA Overview** - Complete methodology and templates
✅ **Risk Assessment Generator** - Step-by-step wizard
✅ **Approval Workflows** - Digital signatures and approvals  
✅ **Export Center** - PDF and Excel exports
✅ **Enhanced Dashboard** - Quick action cards
✅ **Updated Navigation** - All new features accessible

## After Deployment

Your enhanced application will be live at:
https://popovicfilip9-ux.github.io/gmp-gdp-risk-assessment-tool/

The new features will be accessible through the updated navigation menu on the left sidebar.

## Test Login Credentials

- **Administrator**: admin / admin123
- **Risk Assessor**: assessor / assessor123  
- **Viewer**: viewer / viewer123
