import styled from 'styled-components'

export const StyledChat = styled.div`
	width: 500px;
    margin: auto;
`
export const MessageBody = styled.div`
    background: #fff;
    border: 1px solid #ced4da;
    border-top-left-radius: .25rem;
    border-top-right-radius: .25rem;
    
    .scrollBody {
        height: 70vh;

        > div {
            width: -webkit-fill-available;;
            padding: 0px 10px;
        }
    }


`
export const Message = styled.div`
    padding-bottom: 10px;
    display: flex;

    p { margin: 0 }

    &.own { 
        flex-direction: row-reverse;

        .message-content {
            background: #2fc92c;
        }
    }

    .message-meta {
        display: flex;
        flex-direction: row;

        p:first-child {
            margin-right: 10px;
        }
    }
`
export const MessageContent = styled.div`
    background: #509fe3;
    border-radius: .7rem;
    padding: .7rem 1.25rem;

    p {
        overflow: hidden;
        max-width: 150px;
        font-size: 1.25rem;
        overflow-wrap: break-word;
    }
`
export const MessageForm = styled.form`
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    width: 100%;
    margin-top: -1px;

    > * {
        font-size: 1rem;
        border: 1px solid #ced4da;
        border-radius: 0.25rem;
    }

    > input {
        flex: 1 1 auto;
        padding: 0.375rem 0.75rem;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
        border-top-left-radius: 0;
    }

    > button {
        margin-left: -1px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-bottom-left-radius: 0;
    }
`