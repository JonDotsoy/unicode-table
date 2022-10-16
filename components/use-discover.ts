import { useEffect, useMemo, useRef, useState } from "react"

type UnicodeDB = import("./unicode-db").UnicodeDB;
const unicodeDBLazy = import("./unicode-db");

export const useDiscoverForm = (hook?: { update: (value: string) => void }) => {
    const formRef = useRef<HTMLFormElement>();

    useEffect(() => {
        if (formRef.current) {
            const form = formRef.current;
            const onChange = (event: Event) => {
                if (event.currentTarget instanceof HTMLFormElement) {
                    const data = new FormData(event.currentTarget);
                    const { discover } = Object.fromEntries(data.entries());
                    if (typeof discover === "string") {
                        hook.update(discover);
                    }
                }
            }
            const onSubmit = (event: Event) => {
                event.preventDefault()
            }

            form.addEventListener("change", onChange);
            form.addEventListener("submit", onSubmit);
            return () => {
                form.removeEventListener("change", onChange);
                form.removeEventListener("submit", onSubmit);
            }
        }
    }, [formRef.current]);

    return { formRef }
}

export const useDiscover = () => {
    const [searchText, setSearchText] = useState<string>('');
    const [describeVals, setDescribe] = useState<UnicodeDB[]>();

    const update = (value: string) => {
        setSearchText(value);
    }

    useMemo(async () => {
        const describeItems: UnicodeDB[] = [];
        for (const fragment of searchText.split('')) {
            const char = fragment.charCodeAt(0) + 1;
            const { unicodeDB } = await unicodeDBLazy;
            describeItems.push(
                unicodeDB.get(char)
            );
        }
        setDescribe(describeItems);
    }, [searchText]);

    return {
        searchText,
        describe: describeVals,
        update,
    };
}
