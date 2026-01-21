import { ImageResponse } from 'next/og'

// Route segment config
export const runtime = 'edge'

// Image metadata
export const alt = 'Pascal Meyer'
export const size = {
    width: 32,
    height: 32,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse render element
            <div
                style={{
                    fontSize: 24,
                    background: '#121217',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: '20%',
                    padding: '4px',
                }}
            >
                {/* Simplified representation of the logo SVG shapes since we can't easily import SVG here as a component */}
                {/* We'll use a clean representation or just a simple 'PM' if the logo is too complex for OG, 
            but usually we can use the SVG content if we convert it to JSX or use a path. */}
                <svg
                    width="24"
                    height="14"
                    viewBox="0 0 58 34"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M32.9984 0.5L22.3984 33.5H24.4984L35.0984 0.5H32.9984Z" fill="white" />
                    <path d="M41.4 8.5L33.5 33.5H35.6L43.5 8.5H41.4Z" fill="white" />
                    <path d="M18.6 16.5L23.8 0.5H21.7L16.5 16.5H18.6Z" fill="white" />
                    <path d="M55.5008 0.5L44.8008 33.5H46.9008L57.6008 0.5H55.5008Z" fill="white" />
                    <path d="M13.2 0.5H11.1L0.5 33.5H2.6L13.2 0.5Z" fill="white" />
                </svg>
            </div>
        ),
        // ImageResponse options
        {
            // For convenience, we can re-use the exported icons size metadata
            // config to also set the ImageResponse's width and height.
            ...size,
        }
    )
}
