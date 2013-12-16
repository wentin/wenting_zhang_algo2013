#ifndef QUEUERECTANGLE_H
#define QUEUERECTANGLE_H


#include "ofMain.h"
#include "rectangle.h"
#define TOTAL_NUMBER 10

class queueRectangle
{
    public:
        queueRectangle();
        virtual ~queueRectangle();

        void setup();
        void draw();
        void update();

        void mouseMoved(ofMouseEventArgs & args);
        void mouseDragged(ofMouseEventArgs & args);
        void mousePressed(ofMouseEventArgs & args);
        void mouseReleased(ofMouseEventArgs & args);
    protected:
    private:
        rectangle grayRectangles [TOTAL_NUMBER];
};

#endif // QUEUERECTANGLE_H
