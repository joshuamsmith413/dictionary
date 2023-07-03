import React, { HTMLAttributes, ReactNode } from 'react';
import { TWordDefinition, TMeaning, TPhonetics, TSynonyms, TAntonyms, TDefinition } from './types';
import Phonetics from './Phonetics';

interface IProps extends HTMLAttributes<HTMLElement> {
    wordDefinition: TWordDefinition;
}

export default function Definition({ wordDefinition }: IProps) {
    const { word, phonetic, phonetics, origin, meanings, } = wordDefinition[0];

    const renderAntonyms = (antonyms: TAntonyms) => {
        let antonymStr = '';
        antonyms.forEach(antonym => {
            antonymStr += `${antonym}, `
        })
        return <p>{antonymStr.replace(/,\s*$/, "")}</p>
    }
    
    const rendersynonyms = (synonyms: TSynonyms) => {
        let synonymStr = ''
        synonyms.forEach(synonym => {
            synonymStr += `${synonym}, `;
        })
        return <p>{synonymStr.replace(/,\s*$/, "")}</p>
    }

    const renderDefinitions = (definitions: TDefinition[]) => {
        return definitions.map((def: TDefinition, index) => {
            return (
                <div className="definition" key={index}>
                    <p>{index+1}. {def.definition}</p>
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
                <div className="meaning" key={meaning.partOfSpeech}>
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

    const getAudio = (arr: TPhonetics): string | undefined => {
        let file = arr.find(obj => {
            return obj.audio !== ''
        })
        return file?.audio;
      }

    return (
        <>
            <div className="info">
                <p className="title"><strong>{word}: </strong> {phonetic}</p>
                    { getAudio(phonetics) !== undefined && <Phonetics audio={getAudio(phonetics)} />}
                <div className="meanings">
                    {renderMeanings(meanings)}
                </div>
            </div>
        </>
    )
}