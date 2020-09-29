import styled from 'styled-components';

const WordInput = styled.input`
   background-color: ${ props => props.checkValidation !== null ? (props.checkValidation ? '#62856d' : '#917075') : '#dadada'};
`

export { WordInput };