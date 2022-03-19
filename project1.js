// bgImg is the background image to be modified.
// fgImg is the foreground image.
// fgOpac is the opacity of the foreground image.
// fgPos is the position of the foreground image in pixels. It can be negative and (0,0) means the top-left pixels of the foreground and background are aligned.

function composite( bgImg, fgImg, fgOpac, fgPos ) {

    // declaring variables

    let fgIndex, bgIndex, af, ab, cf, cb; // indices indicate pixel number

    let x = fgPos.x, y = (fgPos.y);    

    // iterating for every pixel in the foreground image

    for (let fg_y = 0; fg_y < fgImg.height; fg_y++) {
        
        // checking if the given pixel on fgImg is on the canvas in relation to fgPos
        if ((y + fg_y) < 0) {
            continue;
        } else if ((y + fg_y) > bgImg.height) {
            return;
        }

        for (let fg_x = 0; fg_x < fgImg.width; fg_x++) {
            
            // checking if the given pixel on fgImg is on the canvas in relation to fgPos
            if ((x + fg_x) < 0) {
                continue;
            } else if ((x + fg_x) > bgImg.width) {
                break;
            }

            // locating overlapping pixels on foreground & background
            bgIndex = 4 * ((fg_x + x) + (fg_y + y) * bgImg.width);
            fgIndex = 4 * (fg_x + fg_y * fgImg.width);
            
            // pulling alpha data (used for all colors)
            af = (fgImg.data[fgIndex + 3] * fgOpac) / 255;
            ab = bgImg.data[bgIndex + 3] / 255;

            // iterate for rgb
            for (let color = 0; color < 3; color++) {
                cf = fgImg.data[fgIndex + color];
                cb = bgImg.data[bgIndex + color];
                a = (af + (1 - af) * ab);
    
                // alter the background image
                bgImg.data[bgIndex + color] = ((af * cf) + ((1-af) * ab * cb)) / a ;
                
            }
            // rewrite alpha data
            bgImg.data[bgIndex+3] = a * 255;

        }
    }

}