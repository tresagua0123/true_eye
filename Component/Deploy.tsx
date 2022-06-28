import React from "react"

interface Props {
    state: any
}

export const Deploy: React.VFC<Props> = ({state}) => {
    return (
        <div>Content: {state}</div>
    )
}