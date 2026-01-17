#!/bin/bash

# Image optimization script for Molargik Software website
# Uses macOS sips to resize images for web use

ASSETS_DIR="src/assets"

echo "Starting image optimization..."

# Function to resize image if it exceeds max dimension
resize_if_needed() {
    local file="$1"
    local max_width="$2"
    local max_height="$3"

    # Get current dimensions
    local width=$(sips -g pixelWidth "$file" 2>/dev/null | tail -1 | awk '{print $2}')
    local height=$(sips -g pixelHeight "$file" 2>/dev/null | tail -1 | awk '{print $2}')

    if [ -z "$width" ] || [ -z "$height" ]; then
        return
    fi

    local needs_resize=false

    if [ "$width" -gt "$max_width" ]; then
        needs_resize=true
    fi

    if [ "$height" -gt "$max_height" ]; then
        needs_resize=true
    fi

    if [ "$needs_resize" = true ]; then
        local orig_size=$(ls -lh "$file" | awk '{print $5}')

        # Calculate new dimensions maintaining aspect ratio
        if [ "$width" -gt "$height" ]; then
            # Landscape - constrain by width
            sips --resampleWidth "$max_width" "$file" >/dev/null 2>&1
        else
            # Portrait - constrain by height
            sips --resampleHeight "$max_height" "$file" >/dev/null 2>&1
        fi

        local new_size=$(ls -lh "$file" | awk '{print $5}')
        echo "  Resized: $(basename "$file") ($orig_size -> $new_size)"
    fi
}

# Optimize card backgrounds (max 1600px wide)
echo ""
echo "Optimizing card backgrounds..."
find "$ASSETS_DIR" -name "cardBackground.*" -type f | while read file; do
    resize_if_needed "$file" 1600 1200
done

# Optimize screenshot images (max 800px wide for phone screenshots)
echo ""
echo "Optimizing screenshots..."
for dir in setdeck mygra waffle stork opalite; do
    if [ -d "$ASSETS_DIR/$dir" ]; then
        find "$ASSETS_DIR/$dir" -name "screen*" -type f | while read file; do
            resize_if_needed "$file" 800 1400
        done
    fi
done

# Optimize headshot (max 800px)
echo ""
echo "Optimizing headshot..."
if [ -f "$ASSETS_DIR/nickheadshot.jpeg" ]; then
    resize_if_needed "$ASSETS_DIR/nickheadshot.jpeg" 800 800
fi

# Optimize icons (max 512px)
echo ""
echo "Optimizing icons..."
find "$ASSETS_DIR" -name "*icon*" -type f | while read file; do
    resize_if_needed "$file" 512 512
done

# Optimize logos
echo ""
echo "Optimizing logos..."
find "$ASSETS_DIR" -name "*logo*" -type f | while read file; do
    resize_if_needed "$file" 400 400
done

echo ""
echo "Image optimization complete!"
