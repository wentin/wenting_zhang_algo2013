#include "queueLine.h"

queueLine::queueLine()
{
    //ctor
}

queueLine::~queueLine()
{
    //dtor
}


void queueLine::setup()
{
    ofRegisterMouseEvents(this);
    ofSetColor(255, 255, 0);
    for (int i = 1; i < TOTAL_NUMBER; i++) {
        position[i].set(0, 0);
        positionB[i].set(0, 0);
    }
}
void queueLine::draw()
{
    ofCircle(position[0].x + 0.5*(positionB[0].x - position[0].x), position[0].y + 0.5*(positionB[0].y - position[0].y), 7);
    position[0].set(position[0].x + 0.5*(positionB[0].x - position[0].x), position[0].y + 0.5*(positionB[0].y - position[0].y));
    for (int i = 1; i < TOTAL_NUMBER; i++) {
        positionB[i].set(position[i-1].x, position[i-1].y);
        ofCircle(position[i].x + 0.5*(positionB[i].x - position[i].x), position[i].y + 0.5*(positionB[i].y - position[i].y), 7-0.4*i);
        position[i].set(position[i].x + 0.5*(positionB[i].x - position[i].x), position[i].y + 0.5*(positionB[i].y - position[i].y));
    }
}
void queueLine::update()
{
}

void queueLine::mousePressed(ofMouseEventArgs & args){
    positionB[0].set(args.x, args.y);
}
void queueLine::mouseMoved(ofMouseEventArgs & args){
    positionB[0].set(args.x, args.y);
}
void queueLine::mouseDragged(ofMouseEventArgs & args){
    positionB[0].set(args.x, args.y);
}
void queueLine::mouseReleased(ofMouseEventArgs & args){}
