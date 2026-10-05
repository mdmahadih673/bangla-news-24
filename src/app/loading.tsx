
export default function LoadingSkeleton() {
    return (
        <div className="w-full animate-pulse">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

                {/* Page Header */}
                <div className="h-7 w-40 bg-gray-200 rounded mb-6" />

                {/* News Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="bg-white border border-gray-200 rounded-lg overflow-hidden"
                        >
                            {/* Image */}
                            <div className="w-full h-48 bg-gray-200" />

                            <div className="p-4">
                                {/* Category */}
                                <div className="h-3 w-20 bg-gray-200 rounded mb-3" />

                                {/* Title */}
                                <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                                <div className="h-5 w-4/5 bg-gray-200 rounded mb-4" />

                                {/* Description */}
                                <div className="h-3 w-full bg-gray-100 rounded mb-2" />
                                <div className="h-3 w-3/4 bg-gray-100 rounded mb-4" />

                                {/* Bottom Info */}
                                <div className="flex items-center justify-between">
                                    <div className="h-3 w-24 bg-gray-200 rounded" />
                                    <div className="h-3 w-16 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

