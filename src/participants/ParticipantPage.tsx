import HttpClient from '../common/HttpClient';
import React, { useState } from 'react'
import ParticipantService from '../services/ParticipantService'

const participantService = new ParticipantService(new HttpClient('https://localhost:44306'))

