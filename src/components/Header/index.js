import React from 'react';
import * as S from './styles'

const Header = ( { text = 'nuffsaid.com Coding Challenge', children} ) => {
    
    return (
        <header>
            <S.Title>{ text }</S.Title>
            <hr style={{'margin' : 0}}/>
            <S.SubHeader>
                {children}
            </S.SubHeader>
        </header>
    )
}

export default Header;