# Portfolio Website

Professional full-stack developer portfolio showcasing projects, skills, and services. Built with optimized HTML, CSS, and JavaScript.

## 🚀 Quick Performance Fix (Start Here)

Your portfolio is optimized but needs **5 minutes of action** to reach peak speed (1-2s load time).

### 1. Compress Images (Critical)
The largest bottleneck is image size (currently ~5.8MB).
1.  Go to [Squoosh.app](https://squoosh.app).
2.  Compress these files in `public/resource/`:
    *   `code-pattern.png`
    *   `devoxxa.png`
    *   `edulms.png`
    *   `hero-background.png`
    *   `workspace.png`
3.  Replace the original files. **Target: < 350KB each.**

### 2. Deployment
*   **Push to GitHub**: `git push`
*   **Vercel**: Will auto-deploy your optimized site.

---

## ⚡ Optimization Features Implemented

We have already applied the following technical optimizations:
*   **Deferred Script Loading**: GSAP and other scripts load with `defer`, preventing render blocking.
*   **Service Worker (`sw.js`)**: Implements intelligent caching and offline support.
*   **Performance Script (`perf-optimizations.js`)**:
    *   Intersection Observer for true lazy loading.
    *   Critical image preloading.
    *   Safe GSAP initialization.

---

## 🛠️ Technical Details

### Project Structure
*   `public/`: root folder for the website.
    *   `data.js`: Main configuration file for projects and content.
    *   `resource/`: Images and assets.
    *   `*.html`: Pages (index, about, projects, services, blog).

### Verification
Test your improvements using [Google PageSpeed Insights](https://pagespeed.web.dev).
*   **Target Score**: > 85/100
*   **Target Load Time**: < 2 seconds

---

## 📋 Previous Documentation Summary

This README consolidates the following legacy guides:
*   `QUICK-FIX.md`: Action plan (Incorporated above).
*   `DEPLOYMENT-GUIDE.md`: Deployment steps (Standard Vercel flow).
*   `OPTIMIZATION-ROADMAP.md`: Detailed breakdown of optimization phases.
*   `STATUS-REPORT.md`: Bottleneck analysis.
