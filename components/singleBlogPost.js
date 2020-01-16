import React from 'react';

import '../css/singleBlogPost.css';

// NOTE TO SELF: always wrap images in a div with class img-wrapper
function SingleBlogPost(props) {
    return (
        <section className='single-post pad-50'>
            <div className='container'>
                <div className='row'>
                    {/* Part 1 title and meta */}
                    <div className='col-lg-8 offset-lg-2'>
                        <div className='entry-header text-left'>
                            <h4 className='entry-meta style2'>
                                Abhishek Mehandiratta <span></span>
                                23 December 2018
                            </h4>
                            <h1 className='entry-title'>Post title will go here!</h1>
                        </div>
                    </div>
                    {/* Part 2 header image */}
                    <div className='col-lg-12'>
                        <div className='entry-media'>
                            <img src='http://localhost:3001/static/blogs/Group1.jpg' alt='header image' />
                        </div>
                    </div>
                    {/* Part 3 content */}
                    <div className='col-lg-8 offset-lg-2 '>
                        <div className='entry-content'>
                            <p>While a logo might be the most recognizable <a href='#'>manifestation of a brand</a>, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:</p>
                            <p>While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and <a href='#'>present themselves in colors</a>, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:</p>
                            <h3>The Basic Idea</h3>
                            <p>While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:</p>
                            <div className='img-wrapper'>
                                <img src='http://localhost:3001/static/blogs/tree.jpg' alt='single-image' />
                            </div>
                            <figcaption className='wp-caption-text'>Suspendisse laoreet ut ligula et semper.</figcaption>
                            <p>While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:While a logo might be the most recognizable manifestation of a brand, it’s only one of many. Brands cut across media, and present themselves in colors, shapes, words, sounds, and even smells. That’s because a brand, at it’s core, is immaterial. It’s about abstract attributes and values which present themselves in concrete ways:</p>
                            <ul>
                                <li><b>Virgin America </b>is about quality, fun, innovation, challenging assumptions. You can see it in purple aircraft lighting and quirky safety videos.</li>
                                <li><b>Honda </b>is about affordable quality and trust. You can see it in reliable, albeit generic-looking vehicles, and simple and approachable visual design.</li>
                                <li><b>Ikea </b>is about cost-consciousness, simplicity and togetherness. You can see it in incredibly affordable furniture, family-oriented stores, and approachable visual design.</li>
                            </ul>
                            <p>Building a brand is a long-term commitment which results from thousands of interactions between a customer and the brand’s touch points over time.</p>
                        </div>
                        <div className='entry-share-div'>
                            <h5>Share :</h5>
                            <ul className='social-text light list-inline'>
                                <li className='list-inline-item'><a className='text-facebook' href='#'>facebook</a></li>
                                <li className='list-inline-item'><a className='text-twiiter' href='#'>Twitter</a></li>
                                <li className='list-inline-item'><a className='text-linkedin' href='#'>Linkedin</a></li>
                                <li className='list-inline-item'><a className='text-instagram' href='#'>Instagram</a></li>
                            </ul>
                        </div>
                        <div className='entry-share-div'>
                            <h5>Tag :</h5>
                            <ul className='taglist list-inline'>
                                <li className='list-inline-item'><a className='text-facebook' href='#'>Travel</a></li>
                                <li className='list-inline-item'><a className='text-twiiter' href='#'>Design</a></li>
                                <li className='list-inline-item'><a className='text-linkedin' href='#'>Beauty</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}


export default SingleBlogPost;
