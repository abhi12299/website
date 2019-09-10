import Router from 'next/router';
import $ from 'jquery';

const animateToElem = (scrollToElement) => {
    if (!scrollToElement) {
        $('html, body').animate({ scrollTop: 0 }, 800);
    } else {
        const elem = $(scrollToElement);
        elem && elem.length > 0 && $('html, body').animate({ scrollTop: elem.offset().top - 100}, 800);
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
        // if we're on the next page, just scroll to top
        animateToElem(scrollToElement);
        cbAfterAnimate();
    } else {
        Router.push(nextPage).then(() => window.scrollTo(0, 0));
    }
}
