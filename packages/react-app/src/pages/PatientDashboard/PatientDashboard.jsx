/* eslint-disable no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';

import PageBase from '../PageBase/PageBase';
import MedicalHistory from '../../components/MedicalHistory/MedicalHistory';

const PatientDashboard = () => {
  return (
    <PageBase>
      <div className="container mx-auto">
        <div className="text-chetwode-blue text-4xl">NFT Medical Records</div>
        <div className="py-6">
          <MedicalHistory />
        </div>
        <div className="text-chetwode-blue text-4xl">Upcoming Appointments</div>
        <div className="py-6 flex flex-row justify-between items-center">
          You have an appointment on 28.05.2022 with Dr. Watermelon,
          Psychiatrist
          <Link
            className="btn rounded-md text-md font-bold bg-chetwode-blue border-chetwode-blue"
            to="/appointment"
          >
            To Video Call
          </Link>
        </div>
      </div>
    </PageBase>
  );
};

export default PatientDashboard;
