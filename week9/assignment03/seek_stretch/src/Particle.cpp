//
//  Particle.cpp
//  SingleParticle
//
//  Created by Charlie Whitney on 9/23/13.
//
//

#include "Particle.h"

Particle::Particle() {
    setParams( ofVec2f(0,0), ofVec2f(0,0));
    damping = ofVec2f( 0.01f );
    
    maxSpeed = 10.0;
    maxForce = 0.4;
    slowDownRadius = 200.0;
}

void Particle::setParams( ofVec2f _pos, ofVec2f _vel ){
    pos.set( _pos );
    vel.set( _vel );
    
    lastPos.set( pos );
}

void Particle::addForce( ofVec2f force ){
    acc += force;       // F = MA
    
    acc.limit( 5.0 );
}

void Particle::addRepulsionForce( const ofVec2f &fromPos ){
    ofVec2f diff = pos - fromPos;
    
    float strength = 1- (diff.length() / 200.0);
    
    addForce( diff.normalized() * (strength) );
}

void Particle::seek( const ofVec2f &dest ) {
    ofVec2f desired = dest - pos;
    
    if( desired.length() < slowDownRadius ){
        float newMag = ofMap( desired.length(), 0, slowDownRadius, 0, maxSpeed);
        
        desired.normalize();
        desired *= newMag;
    }else{
        desired.normalize();
        desired *= maxSpeed;
    }

    ofVec2f steer = desired - vel;
    steer.limit( maxForce );
    
    addForce( steer );
}

void Particle::update() {
    vel = vel + acc;
    pos = pos + vel;
    
    vel *= 0.97;
    
    acc *= 0;
    
    lastPos.set( pos );
}

void Particle::draw() {
//    ofCircle(pos.x, pos.y, 4);
    
    ofSetRectMode( OF_RECTMODE_CENTER );
    
    ofPushMatrix();
    ofTranslate( pos );
    
        float rotAmt = atan2( vel.y, vel.x );
        ofRotate( ofRadToDeg(rotAmt) + 90 );
        ofRect( 0,0, 20, 20*vel.length());
    
    ofPopMatrix();
}