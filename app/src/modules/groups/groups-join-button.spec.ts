///<reference path="../../../../node_modules/@types/jasmine/index.d.ts"/>

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';

import { By } from '@angular/platform-browser';

import { SignupOnActionModalMock } from '../../mocks/modules/modals/signup/signup-on-action.mock';
import { clientMock } from '../../../tests/client-mock.spec';
import { uploadMock } from '../../../tests/upload-mock.spec';

import { GroupsJoinButton } from './groups-join-button';
import { GroupsService } from './groups-service';

describe('GroupsJoinButton', () => {
  let fixture: ComponentFixture<GroupsJoinButton>;
  let comp: GroupsJoinButton;

  /** Helpers */

  function setGroup(props: any) {
    comp._group = Object.assign({
      guid: 1000,
      'is:banned': false,
      'is:awaiting': false,
      'is:invited': false,
      'is:member': false,
      membership: 2
    }, props);
  }

  function getJoinButtons(): DebugElement[] {
    return fixture.debugElement.queryAll(By.css('.minds-group-join-button'));
  }

  function getAcceptAndDeclineButtons(): DebugElement[] {
    return fixture.debugElement.queryAll(By.css('span > .minds-group-join-button'));
  }

  function getLeaveButton(): DebugElement {
    return fixture.debugElement.query(By.css('.minds-group-join-button.subscribed'));
  }

  function getCancelRequestButton(): DebugElement {
    return fixture.debugElement.query(By.css('.minds-group-join-button.awaiting'));
  }

  /** /Helpers */

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SignupOnActionModalMock,
        GroupsJoinButton
      ],
      imports: [],
      providers: [
        { provide: GroupsService, deps: [ clientMock, uploadMock ] },
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupsJoinButton);
    comp = fixture.componentInstance;

    setGroup({});
    fixture.detectChanges();
  });

  it('should render a button to join', () => {
    setGroup({
      'is:banned': false,
      'is:awaiting': false,
      'is:invited': false,
      'is:member': false
    });
    fixture.detectChanges();

    expect(getJoinButtons().length).toBe(1);
  });

  it('should not render a button to join if banned', () => {
    setGroup({
      'is:banned': true,
      'is:awaiting': false,
      'is:invited': false,
      'is:member': false
    });
    fixture.detectChanges();

    expect(getJoinButtons().length).toBe(0);
  });

  it('should render a button to accept or decline an invitation', () => {
    setGroup({
      'is:banned': false,
      'is:awaiting': false,
      'is:invited': true,
      'is:member': false
    });
    fixture.detectChanges();

    expect(getAcceptAndDeclineButtons().length).toBe(2);
  });

  it('should render a button to leave', () => {
    setGroup({
      'is:banned': false,
      'is:awaiting': false,
      'is:invited': false,
      'is:member': true
    });
    fixture.detectChanges();

    expect(getLeaveButton()).toBeTruthy();
  });

  it('should render a button to cancel join request', () => {
    setGroup({
      'is:banned': false,
      'is:awaiting': true,
      'is:invited': false,
      'is:member': false
    });
    fixture.detectChanges();

    expect(getCancelRequestButton()).toBeTruthy();
  });
});
