#ifndef RECTANGLE_H
#define RECTANGLE_H

#include "ofMain.h"

class rectangle
{
    public:
        rectangle();
        ~rectangle();
        void setup(int width, int height, int x, int y, ofColor color);
        void draw();
        void update();

        void mouseMoved(ofMouseEventArgs & args);
        void mouseDragged(ofMouseEventArgs & args);
        void mousePressed(ofMouseEventArgs & args);
        void mouseReleased(ofMouseEventArgs & args);

        ofPoint position;
        ofPoint positionA;
        ofPoint positionB;

        float rwidth;
        float rheight;
        float perc;

    protected:
    private:
};

#endif // RECTANGLE_H
