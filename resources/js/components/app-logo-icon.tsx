import { SVGAttributes } from 'react';

export default function AppLogoIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg {...props} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            {/* Star sparkle */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 4L13.8 8.2C14.1 8.9 14.8 9.3 15.5 9.4L20 10L16.7 13.3C16.2 13.8 16 14.5 16.1 15.2L16.8 19.7L12.7 17.5C12.3 17.2 11.7 17.2 11.3 17.5L7.2 19.7L7.9 15.2C8 14.5 7.8 13.8 7.3 13.3L4 10L8.5 9.4C9.2 9.3 9.9 8.9 10.2 8.2L12 4Z"
            />
            {/* Wave elements */}
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 16C5.5 16 6.2 15 7.5 15C8.8 15 9.5 16 11 16C12.5 16 13.2 15 14.5 15C15.8 15 16.5 16 18 16C19.5 16 20.2 15 21.5 15"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4 19C5.5 19 6.2 18 7.5 18C8.8 18 9.5 19 11 19C12.5 19 13.2 18 14.5 18C15.8 18 16.5 19 18 19C19.5 19 20.2 18 21.5 18"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                opacity="0.5"
            />
        </svg>
    );
}
