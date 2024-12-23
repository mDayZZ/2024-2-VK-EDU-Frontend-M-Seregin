import {useEffect, useRef, useState} from "react";

export const useLazyImage = (src) => {
    const imageRef = useRef(null);
    if (!imageRef.current) {
        return;
    }
    useEffect(() => {
        imageRef.current.src = null;
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    imageRef.current.src = src;
                }
            })
        })

        observer.observe(imageRef.current);


        return () => {
            if (imageRef.current) {
                observer.unobserve(imageRef.current);
            }
        }

    }, []);
    return imageRef
}