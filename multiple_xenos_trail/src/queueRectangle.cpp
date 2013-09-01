#include "queueRectangle.h"

queueRectangle::queueRectangle()
{
    //ctor
    for (int i = 0; i < TOTAL_NUMBER; i++) {
        grayRectangles[i].setup(10, 10, 0, 0, ofColor(255,0,0));
    }
    ofRegisterMouseEvents(this);
}

queueRectangle::~queueRectangle()
{
    //dtor
}

void queueRectangle::setup()
{
}

void queueRectangle::update()
{
    for (int i = 1; i < TOTAL_NUMBER; i++) {
        grayRectangles[i].positionB.set(grayRectangles[i-1].position.x, grayRectangles[i-1].position.y);
    }
}

void queueRectangle::draw()
{
    for (int i = 1; i < TOTAL_NUMBER; i++) {
        grayRectangles[i].draw();
    }
}


void queueRectangle::mousePressed(ofMouseEventArgs & args)
{
    grayRectangles[0].positionB.set(args.x, args.y);
    //cout << "grayRectangles[0] position" << grayRectangles[0].position.x << ", " << grayRectangles[0].position.y << "\n";

    for (int i = 1; i < TOTAL_NUMBER; i++) {
         grayRectangles[i].positionB.set(grayRectangles[i-1].position.x, grayRectangles[i-1].position.y);
    }
}

void queueRectangle::mouseMoved(ofMouseEventArgs & args){}
void queueRectangle::mouseDragged(ofMouseEventArgs & args){}
void queueRectangle::mouseReleased(ofMouseEventArgs & args){}
