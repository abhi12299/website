import Router from 'next/router';
import $ from 'jquery';

const animateToElem = (scrollToElement, animateDuration = 800) => {
    if (!scrollToElement) {
        $('html, body').animate({ scrollTop: 0 }, animateDuration);
    } else {
        // if window has scrolled past element, subtract expanded height if in mobile view
        const elem = $(scrollToElement);
        let expandedMenuHeight = 0;
        if (window.innerWidth <= 991) {
            expandedMenuHeight = window.scrollY >= elem.offset().top ? 0 : 170;
        }
        elem && elem.length > 0 && $('html, body').animate({ scrollTop: elem.offset().top - 100 - expandedMenuHeight}, animateDuration);
    }
}

const noOp = () => {};

/**
 * @description Handles whether to scroll to top or go to next page on click
 * of something. cbAfterAnimate Callback that runs after animation to top is complete (if animation happens),
 * scrollToElement ID or class of element to scroll to. Defaults to null
 * @param { String } nextPage Relative url of next page to go to on click.
 * @param { Object } opts Optional arguments having cbAfterAnimate and scrollToElement.
 */
export default (nextPage, { cbAfterAnimate = noOp, scrollToElement = null } = {}) => {
    if (Router.pathname === nextPage) {
        // if we're on the next page, animate to element
        cbAfterAnimate();
        animateToElem(scrollToElement);
    } else {
        Router.push(nextPage).then(() => {
            if (scrollToElement === 'TOP') {
                // just go to top
                window.scrollTo(0, 0);
            }
            else if (scrollToElement) animateToElem(scrollToElement, 0);
        });
    }
}
