//
//  Ripple.h
//  Ripple3
//
//  Created by Wenting Zhang on 9/17/13.
//
//

#ifndef __Ripple3__Ripple__
#define __Ripple3__Ripple__

#include <iostream>
#include "ofMain.h"
#define TOTAL_NUMBER 14

class Ripple
{
public:
    Ripple();
    void draw();
    void update();
    
    float radius;
    float radiusSet [TOTAL_NUMBER];
    float radiusTargetSet [TOTAL_NUMBER];
    float catchUpSpeed;
    
    ofPoint pos;
    
    void mouseMoved(ofMouseEventArgs & args);
    void mouseDragged(ofMouseEventArgs & args);
    void mousePressed(ofMouseEventArgs & args);
    void mouseReleased(ofMouseEventArgs & args);
    
protected:
private:
    
};

#endif /* defined(__Ripple3__Ripple__) */
