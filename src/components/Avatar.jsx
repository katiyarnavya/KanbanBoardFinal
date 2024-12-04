import React from "react";

const Avatar = ({ name, status, size = 18, textColor = "#FFFFFF" }) => {
    // Function to hash a name into a consistent color
    const getColorFromName = (fullName) => {
        let hash = 0;
        for (let i = 0; i < fullName.length; i++) {
            hash = fullName.charCodeAt(i) + ((hash << 5) - hash); // Generate a hash
        }
        const color = `#${((hash >> 24) & 0xff).toString(16).padStart(2, "0")}${(
            (hash >> 16) &
            0xff
        )
            .toString(16)
            .padStart(2, "0")}${((hash >> 8) & 0xff)
                .toString(16)
                .padStart(2, "0")}`; // Convert hash to color
        return color.slice(0, 7); // Ensure the color is a valid hex
    };

    // Extract initials from the name
    const getInitials = (fullName) => {
        const nameParts = fullName.split(" ");
        const initials =
            nameParts.length > 1
                ? nameParts[0][0] + nameParts[1][0]
                : nameParts[0][0];
        return initials.toUpperCase();
    };

    const initials = getInitials(name);
    const bgColor = getColorFromName(name); // Get consistent color based on name

    // Map status to colors
    const statusColor = status ? "#28A745" : "#aaa";

    // Render the SVG
    return (
        <div style={{ position: "relative", display: "inline-block" }}>
            <svg
                width={size}
                height={size}
                xmlns="http://www.w3.org/2000/svg"
                style={{ borderRadius: "50%" }}
            >
                {/* Background Circle */}
                <circle cx={size / 2} cy={size / 2} r={size / 2} fill={bgColor} />

                {/* Initials Text */}
                <text
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dy=".35em"
                    fontSize={size / 2}
                    fill={textColor}
                    fontFamily="Arial, sans-serif"
                    fontWeight="bold"
                >
                    {initials}
                </text>
            </svg>

            {/* Status Indicator */}
            <span
                style={{
                    position: "absolute",
                    bottom: "5%",
                    right: "5%",
                    width: size / 4,
                    height: size / 4,
                    backgroundColor: statusColor,
                    borderRadius: "50%",
                    border: `1px solid white`, // Add a white border to match the avatar
                    boxShadow: "0 0 2px rgba(0, 0, 0, 0.2)",
                }}
            ></span>
        </div>
    );
};

export default Avatar;
