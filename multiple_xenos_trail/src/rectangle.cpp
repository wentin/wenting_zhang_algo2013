#include "rectangle.h"

rectangle::rectangle()
{
    //ctor
}

rectangle::~rectangle()
{
    //dtor
}

void rectangle::setup(int width, int height, int x, int y, ofColor color)
{
    ofRegisterMouseEvents(this); // this will enable our circle class to listen to the mouse events.

    this->position.set(x, y);
    this->positionA.set(x, y);
    this->positionB.set(x, y);
    this->rwidth = width;
    this->rheight = height;
    this->perc = 0;
    ofSetColor(color);
}
void rectangle::draw()
{
    ofRect(this->position.x + 0.1*(this->positionB.x - this->position.x), this->position.y + 0.1*(this->positionB.y - this->position.y), this->rwidth, this->rheight);
    this->position.set(this->position.x + 0.1*(this->positionB.x - this->position.x), this->position.y + 0.1*(this->positionB.y - this->position.y));
}
void rectangle::update()
{
    if (perc < 100) {
        perc+=0.1;
    }
}

void rectangle::mousePressed(ofMouseEventArgs & args)
{
    //positionB.set(args.x, args.y);
    perc = 0;
}

void rectangle::mouseMoved(ofMouseEventArgs & args)
{
}
void rectangle::mouseDragged(ofMouseEventArgs & args){}
void rectangle::mouseReleased(ofMouseEventArgs & args){}
