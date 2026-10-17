# PauzeControl Website

<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=600&size=22&duration=2600&pause=700&color=4C8DFF&center=true&vCenter=true&width=680&lines=PauzeControl+Website" alt="Animated header: PauzeControl Website">
</p>


**Live website:** https://pauzedevs.github.io/PauzeControl-Website/

The public-facing website for PauzeControl, a PauzeDevs project. The visual direction is a restrained, Apple-inspired Liquid Glass aesthetic: translucent surfaces, optical depth, reflective edges, and subtle motion—without a 3D device showcase or external JavaScript libraries.

## Pages

- Home: product overview and development-stage feature descriptions.
- Web experience: responsive iOS-inspired browser interface preview for PauzeControl with interactive overview, Live Screen, Device Studio, transfers, and settings panels. Controls are demo-only and never contact a real device.
- System status: separates what this page can verify from service and device monitoring that is not connected.
- Documentation: connection model, setup overview, permissions, file-transfer safety, troubleshooting, and bug-reporting guidance.
- Not found: a branded 404 page for invalid routes.
- Changelog: website progress notes.

The public site includes canonical page URLs, social preview metadata, `robots.txt`, and a sitemap for its primary pages. The glass reflection follows pointer position on fine-pointer devices; it does not tilt cards, require WebGL, or load third-party libraries.

## Important status limitation

PauzeControl is built around direct Mac-to-Android communication. This website does not have access to a user's private device session. The status page intentionally does not invent service uptime, incidents, or an “online” state for a Mac agent. A public status feed can be connected later if a real, privacy-conscious health endpoint and external monitoring are implemented.

Public application downloads are intentionally not provided here while release approval is pending. App releases remain separate from this repository.

## Local preview

You can preview the static site without installing a package manager or downloading dependencies. From the repository root, run:

    python3 -m http.server 4173

Then open the local server address for port 4173 in your browser.

## Deployment

The GitHub Actions workflow validates required files, local links/anchors, and JavaScript syntax on pull requests. Before the first deployment, open repository Settings → Pages and choose GitHub Actions as the source. After the site changes are integrated into the main branch, the workflow validates and publishes the static site.

## Design and accessibility

- Responsive layouts for phones, tablets, and desktop screens.
- Semantic navigation, keyboard focus styles, and a skip link.
- Reduced-motion support.
- No framework, package manager, analytics, external images, or runtime JavaScript dependency.
- The page uses system font fallbacks rather than requiring a remote font download.

## Related project

PauzeControl application repository: https://github.com/PauzeDevs/PauzeControl

This is an independent project and is not affiliated with Apple.
