# PauzeControl Website

The public-facing website for PauzeControl, a PauzeDevs project. The visual direction is a restrained, Apple-inspired Liquid Glass aesthetic: translucent surfaces, optical depth, reflective edges, and subtle motion—without a 3D device showcase or external JavaScript libraries.

## Pages

- Home: product overview and development-stage feature descriptions.
- System status: separates what this page can verify from service and device monitoring that is not connected.
- Documentation: connection model, setup overview, permissions, file-transfer safety, troubleshooting, and bug-reporting guidance.
- Changelog: website progress notes.

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
