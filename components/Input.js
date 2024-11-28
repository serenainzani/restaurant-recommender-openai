export default function Input() {
    return (
        <div class="relative flex h-20 w-full max-w-sm items-end border-0 border-b-2 focus-within:border-pink-600 transition-colors duration-300">
            <input
                type="text"
                placeholder="Recommend me a restaurant..."
                class="peer w-full border-0 bg-transparent px-2 py-4 placeholder-transparent focus:outline-none focus:ring-0 text-slate-200"
            />
            <label class="top-4 text-sm text-gray-400 pointer-events-none absolute left-2 transition-all peer-placeholder-shown:top-10 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-4 peer-focus:text-sm peer-focus:text-gray-400">
                Recommend me a restaurant...
            </label>
        </div>
    );
}
