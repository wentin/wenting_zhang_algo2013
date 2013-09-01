#ifndef QUEUE_H
#define QUEUE_H

#include "ofMain.h"
#define TOTAL_NUMBER 14

class queueLine
{
    public:
        queueLine();
        void setup();
        void draw();
        void update();

        void mouseMoved(ofMouseEventArgs & args);
        void mouseDragged(ofMouseEventArgs & args);
        void mousePressed(ofMouseEventArgs & args);
        void mouseReleased(ofMouseEventArgs & args);

        ofPoint position [TOTAL_NUMBER];
        ofPoint positionB [TOTAL_NUMBER];

        virtual ~queueLine();
    protected:
    private:
};

#endif // QUEUE_H
