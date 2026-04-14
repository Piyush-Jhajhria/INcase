/**
 * Get the local network IP address for the current machine
 * This allows mobile devices to access the app by scanning QR codes
 */
export const getLocalIPUrl = async (): Promise<string> => {
  const protocol = window.location.protocol;
  const port = window.location.port;
  const hostname = window.location.hostname;

  // If on localhost/127.0.0.1, we need the actual IP
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    try {
      const ip = await detectLocalIP();
      if (ip) {
        return `${protocol}//${ip}${port ? ':' + port : ''}`;
      }
    } catch {
      // Fallback to localhost
    }
    return `${protocol}//${hostname}${port ? ':' + port : ''}`;
  }

  return `${protocol}//${hostname}${port ? ':' + port : ''}`;
};

/**
 * Detect local IP address using WebRTC
 */
export const detectLocalIP = (): Promise<string | null> => {
  return new Promise((resolve) => {
    const pc = new (window as any).RTCPeerConnection({ iceServers: [] });
    const ips: string[] = [];

    pc.createDataChannel('');
    pc.createOffer().then((offer: RTCSessionDescriptionInit) => pc.setLocalDescription(offer));

    pc.onicecandidate = (ice: any) => {
      if (!ice || !ice.candidate) return;
      const ipRegex = /([0-9]{1,3}(\.[0-9]{1,3}){3})/;
      const ipAddress = ipRegex.exec(ice.candidate.candidate);
      if (ipAddress) {
        const ip = ipAddress[1];
        // Filter out local loopback addresses
        if (!ip.startsWith('127.') && !ips.includes(ip)) {
          ips.push(ip);
        }
      }
    };

    setTimeout(() => {
      pc.close();
      resolve(ips.length > 0 ? ips[0] : null);
    }, 1000);
  });
};
