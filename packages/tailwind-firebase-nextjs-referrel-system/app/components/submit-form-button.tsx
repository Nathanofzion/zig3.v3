'use client'

import { Button, ButtonProps } from "@tremor/react";
import { useFormState, useFormStatus } from 'react-dom';
 
/**
 * Button will display loading state if nested in parent form
 * https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations#displaying-loading-state
 *
 * @export
 * @param {{ redirectURL?: string }} { redirectURL }
 * @return {*} 
 */
export default function SubmitButton({ redirectURL, ...params }: { redirectURL?: string } & ButtonProps) {
    // get parent form status
    const { pending } = useFormStatus();
 
    return (
        <Button aria-disabled={pending} type="submit" loading={pending} loadingText="Loading..." {...params}>{params.children}</Button>
    )
}