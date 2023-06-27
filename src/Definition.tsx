import React, { HTMLAttributes, ReactNode } from 'react';
import { TWordDefinition, TMeaning, TPhonetics, TSynonyms, TAntonyms, TDefinition } from './types';

interface IProps extends HTMLAttributes<HTMLElement> {
    wordDefinition: TWordDefinition;
}

export default function Definition({ wordDefinition }: IProps) {
    const { word, phonetic, phonetics, origin, meanings, } = wordDefinition[0];

    const renderAntonyms = (antonyms: TAntonyms) => {
        return antonyms.map(antonym => {
            return <p>{antonym}</p>
        })
    }
    
    const rendersynonyms = (synonyms: TSynonyms) => {
        return synonyms.map(synonym => {
            return <p>{synonym}</p>
        })
    }

    const renderDefinitions = (definitions: TDefinition[]) => {
        return definitions.map((def: TDefinition) => {
            return (
                <div className="definition">
                    <p>{def.definition}</p>
                    <div className="synonyms">
                        {def.synonyms.length > 0 &&<strong>Synonyms</strong>}
                        {def.synonyms.length > 0 && rendersynonyms(def.synonyms)}
                    </div>
                    <div className="antonyms">
                        {def.antonyms.length > 0 &&<strong>Antonyms</strong>}
                        {def.antonyms.length > 0 && renderAntonyms(def.antonyms)}
                    </div>
                </div>
            )
        })
    }

    const renderMeanings = (meanings: TMeaning[]) => {
        return meanings.map((meaning: TMeaning) => {
            return (
                <div className="meaning">
                    <div className="synonyms"></div>
                    <strong>{meaning.partOfSpeech}:</strong>
                    {renderDefinitions(meaning.definitions)}
                    <div className="synonyms">
                        {meaning.synonyms.length > 0 &&<h4>Synonyms</h4>}
                        {meaning.synonyms.length > 0 && rendersynonyms(meaning.synonyms)}
                    </div>
                    <div className="antonyms">
                        {meaning.antonyms.length > 0 &&<h4>Antonyms</h4>}
                        {meaning.antonyms.length > 0 && renderAntonyms(meaning.antonyms)}
                    </div>
                </div>
            )
        })
    }

    return (
        <div className="definition-block">
            <h2>{word}</h2>
            <div className="info">
            <div className="meanings">
                {renderMeanings(meanings)}
            </div>
            </div>
        </div>
    )
}