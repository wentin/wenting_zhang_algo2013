//
//  Ripple.cpp
//  ripple
//
//  Created by Wenting Zhang on 9/16/13.
//
//
#include "Ripple.h"


ripple::ripple()
{
    //ctor
    ofSeedRandom();
    ofRegisterMouseEvents(this);
    ofSetColor(255, 255, 0);
    radius = 0;
    catchUpSpeed = 0.03f;
    pos.set(0, 0);
    for (int i = 1; i < TOTAL_NUMBER; i++) {
        radiusSet[i] = 0;
        radiusTargetSet[i] = 0;
    }
}

void ripple::setup()
{
    
}

void ripple::update()
{
    for (int i = 0; i < TOTAL_NUMBER; i++) {
        radiusSet[i] = catchUpSpeed * radiusTargetSet[i] + (1-catchUpSpeed) * radiusTargetSet[i];
        radiusTargetSet[i+1] = radiusSet[i];
    }
}

void ripple::draw()
{
    for (int i = 0; i < TOTAL_NUMBER; i++) {
        ofCircle(pos.x, pos.y, radiusSet[i])
    }
}

void ripple::mousePressed(ofMouseEventArgs & args)
{
    pos.set(args.x, args.y);
    radius = ofRandom(10.0, 20.0);
    radiusTarGetSet[0] = radius;
    
}
void ripple::mouseMoved(ofMouseEventArgs & args)
{
}
void ripple::mouseDragged(ofMouseEventArgs & args)
{
}
void ripple::mouseReleased(ofMouseEventArgs & args)
{
}