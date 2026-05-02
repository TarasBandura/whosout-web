/** Ambient layered orbs + grid — pure CSS hooks, GPU-friendly transforms */
export function WoBackground() {
  return (
    <div className="wo-bg" aria-hidden="true">
      <div className="wo-bg__noise" />
      <div className="wo-bg__orb wo-bg__orb--fire" />
      <div className="wo-bg__orb wo-bg__orb--violet" />
      <div className="wo-bg__orb wo-bg__orb--ember" />
      <div className="wo-bg__vignette" />
    </div>
  );
}
