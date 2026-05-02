import { APP_STORE_URL, GOOGLE_PLAY_URL } from '@/lib/config';

export function StoreButtons() {
  return (
    <>
      <a className="btn btn-secondary" href={APP_STORE_URL} rel="noopener noreferrer" target="_blank">
        Download on the App Store
      </a>
      <a className="btn btn-secondary" href={GOOGLE_PLAY_URL} rel="noopener noreferrer" target="_blank">
        Get it on Google Play
      </a>
    </>
  );
}
