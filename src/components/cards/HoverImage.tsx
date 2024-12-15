export interface HoverImageProps {
    icon: string;
    image: string;
    alt: string;
    transition: string;
    classList?: string;
    imageClass?: string;
    titleTag?: string;
    href?: string;
    target?: "_blank" | "_self" | "_parent" | "_top";
}

const HoverImage: React.FC<HoverImageProps> = ({ icon, image, alt, transition, classList, imageClass, titleTag, href, target = "_self" } ) => {
    return (
        <a href={href} 
            className={`group relative rounded-t-lg object-cover aspect-video rounded-md cursor-crosshair overflow-hidden transition-all duration-500 w-full h-full ${classList}`} 
            tabIndex={0}
            title={titleTag} 
            target={target} 
            rel="noopener noreferrer"
        >
            <i className={`fa-solid ${icon} text-4xl text-center m-auto text-white absolute opacity-0 top-[50%] left-[50%] transform translate-y-[-50%] translate-x-[-50%] transition-all duration-500 z-[5] group-hover:opacity-100 group-focus:opacity-100`}></i>
            <img 
                src={image} 
                alt={alt}
                style={{ viewTransitionName: `${transition}` }}
                loading="lazy" 
                className={`object-cover rounded-t-lg max-w-full aspect-video transition-all duration-500 w-full h-full group-hover:brightness-50 group-focus:brightness-50 ${imageClass}`}
            />
        </a>
    )};

export default HoverImage;