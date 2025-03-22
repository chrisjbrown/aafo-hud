import { PositionBasicOverlayApp } from './view/tjsposition/basic-overlay/PositionBasicOverlayApp';
import '../styles/base.scss'; // Import any styles as this includes them in the build.

/**
 * Launches and positions the main `essential-svelte-esm` menu app to the left of the sidebar.
 */
Hooks.once('ready', () => {
   new PositionBasicOverlayApp().render(true, { focus: true });
});

// Hooks.once("ready", () => {
//    if (game.user.isGM) {
//       // manual rename
//       Hooks.on("renderTokenHUD", renderTokenHUD);
//    }
// });
