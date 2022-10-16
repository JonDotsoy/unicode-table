import { FC, useId } from "react"
import { useDiscover, useDiscoverForm } from "../components/use-discover";

const HomePage: FC = () => {
    const discover = useDiscover();
    const { formRef } = useDiscoverForm(discover);
    const idDiscover = useId();

    return <>
        <section>
            <form ref={formRef}>
                <div>
                    <label htmlFor={idDiscover}>Discover</label>
                    <input type="search" name="discover" id={idDiscover} />
                </div>
            </form>
        </section>

        <article>
            <h2>Search: {discover.searchText}</h2>

            <div>
                <h2>Descrive</h2>
                <pre><code>{JSON.stringify(discover.describe, null, 2)}</code></pre>
            </div>
        </article>
    </>
}

export default HomePage;
