import React, {FunctionComponent} from 'react';
import styled from 'styled-components'
import {Link,} from 'react-router-dom';
import {HeaderTwo, PokemonName, StyledButton} from "../styledComponents";
import {multiplyGrid} from '../theme';

interface PokemonCardProps {
    name: string,
    image: string,
    type: string,
}

export const PokemonCard: FunctionComponent<PokemonCardProps> = ({name, image, type}) => {

    return (
        <Card>
            <PokemonSprite url={image}/>
            <PokemonName>{name}</PokemonName>
            <HeaderTwo>{type}</HeaderTwo>
            <StyledButton>
                <Link to={'/pokemon/' + name}>Show</Link>
            </StyledButton>
        </Card>
    )
}

const Card = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
width: ${multiplyGrid(25)};
height: ${multiplyGrid(40)};
padding: ${multiplyGrid(3)};
margin: ${multiplyGrid(3)};
border-radius: 10px;
color: black;
background: white;
`

type SpriteProps = {
    url?: string
}

const PokemonSprite = styled.div<SpriteProps>`
width: ${multiplyGrid(12)};
height: ${multiplyGrid(25)};
background-repeat: no-repeat;
background-size: contain;
background-image: url(${props => props.url});
`;