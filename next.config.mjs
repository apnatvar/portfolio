/**@type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/photo**",
        search: "",
      },
      {
        protocol: "https",
        hostname: "live.staticflickr.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
  allowedDevOrigins: ["192.168.29.***"],
};
export default nextConfig;
{
  /* <a data-flickr-embed="true" href="https://www.flickr.com/photos/203680033@N06/54847521978/in/dateposted-public/" title="Snapseed"><img src="https://live.staticflickr.com/65535/54847521978_6510e5ab15_b.jpg" width="768" height="1024" alt="Snapseed"/></a><script async src="//embedr.flickr.com/assets/client-code.js" charset="utf-8"></script> */
}
