import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`

export const Title = styled.div`
    font-size: 1.5rem;
    padding: 2rem;
    padding-bottom: 1rem;
    font-weight: bold;
`

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e0e0e0;
`

export const ContentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding-left: 2rem;
    margin: 1.5rem 0;
    border-bottom: 1px solid #e0e0e0;
`

export const Content = styled.div`
    display: flex;
    margin: 0.5rem 0;

    &#group {
        margin-bottom: 1.5rem;
    }
`

export const ContentTitle = styled.div`
    width: 20%;
`
