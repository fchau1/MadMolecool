import React from 'react';
import molecule from './components/assets/molecule.png';

const LandingPage = () => {
    return (
        <div className="container mx-auto">
            <div className="flex flex-col items-center mb-8">
                <img src={molecule} alt="Logo" className="w-24 h-24" />
                <h1 className="text-2xl font-bold">Mad Molecool Notebooks is an all in one space for molecular biologists. Our applications allow you to...</h1>
            </div>

            <div className="flex justify-between">
                <Section image="image1.jpg" text="1) Record your findings in a lab notebook which is formatted with the most up to date Laboratory Electronic Software (LIM). Our application allows for easy management and organization of lab notebooks." />
                <div style={{ width: '1px', height: '100%', backgroundColor: '#000' }}></div>
                <Section image="image2.jpg" text="2) Interact with a fine-tuned GPT-2-Medium LLM trained with the BioASQ and PubmedQA datasets." />
                <div style={{ width: '1px', height: '100%', backgroundColor: '#000' }}></div>
                <Section image="image3.jpg" text="3) Query for the most up to date information on different chemicals along with aiding images" />
            </div>

            <h1 className="text-2xl font-bold">We take care of the logistics so the scientists can focus on what they do best, science!</h1>
        </div>
    );
};

const Section = ({ image, text }) => (
    <div className="flex flex-col items-center">
        <img src={image} alt="Section Image" className="w-32 h-32" />
        <p>{text}</p>
    </div>
);

export default LandingPage;


