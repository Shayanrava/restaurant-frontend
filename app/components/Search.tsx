import React from 'react'

interface SearchQueriesProps {
    searchQuery: string;
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export default function Search({searchQuery ,setSearchQuery} : SearchQueriesProps ) {
    return (
        <section className="flex justify-center pt-5 px-5 pb-12.5 bg-[url('/images/paternmenu.png')] bg-repeat">
            <input
                type="text"
                id="searchInput"
                placeholder="جستجوی غذا ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-105 max-w-[90%] px-6.25 py-4 rounded-[40px] border-2 border-[#d4af37] text-[17px] bg-white text-[#333] outline-none transition-all duration-350 focus:border-[#7a1f1f] focus:shadow-[0_0_15px_rgba(122,31,31,0.2)]"
            />
        </section>
    )
}
