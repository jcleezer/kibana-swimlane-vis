/*
 ****************************************************************************
 *                                                                          *
 * Copyright 2012-2020 Elasticsearch BV                                     *
 *                                                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 *    http://www.apache.org/licenses/LICENSE-2.0                            *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 *                                                                          *
 ****************************************************************************
 */

import './prelert_swimlane_vis.less';

import { setup as visualizations } from '../../../src/legacy/core_plugins/visualizations/public/np_ready/public/legacy';
import { AngularVisController } from 'ui/vis/vis_types/angular_vis_type';
import { Schemas } from 'ui/vis/editors/default/schemas';
import optionsTemplate from './prelert_swimlane_vis_options.html';

import './prelert_swimlane_vis_controller';
import template from './prelert_swimlane_vis.html';

export const prelertSwimlaneDefinition = {
  name: 'ml_swimlane',
  title: 'Swimlane',
  icon: 'list',
  description:
    'Swimlane visualization displaying the behavior of a metric ' +
    'over time across a field from the results. ' +
    'Each lane displays a different value of the field, with the ' +
    'relative size of the metric over each interval indicated ' +
    'by the color of the symbol at that time. ' +
    'Created by Prelert.',
  visConfig: {
    defaults: {
      interval: { display: 'Auto', val: 'auto' },
      thresholdBands: [
        { value: 0, color: '#d2e9f7' },
        { value: 3, color: '#8bc8fb' },
        { value: 25, color: '#ffdd00' },
        { value: 50, color: '#ff7e00' },
        { value: 75, color: '#fe5050' },
      ],
      unknownThresholdColor: '#e6e6e6',
      tooltipNumberFormat: '0.0',
      showLegend: true,
      alphabetSortLaneLabels: 'off',
    },
    template,
    intervalOptions: [
      { display: 'Auto', val: 'auto' },
      { display: 'Millisecond', val: 'ms' },
      { display: 'Second', val: 's' },
      { display: 'Minute', val: 'm' },
      { display: 'Hourly', val: 'h' },
      { display: 'Daily', val: 'd' },
      { display: 'Weekly', val: 'w' },
    ],
  },
  responseHandler: 'none',
  visualization: AngularVisController,
  editorConfig: {
    collections: {},
    optionsTemplate,
    schemas: new Schemas([
      {
        group: 'metrics',
        name: 'metric',
        title: 'Value',
        min: 1,
        max: 1,
        aggFilter: ['count', 'avg', 'sum', 'min', 'max', 'cardinality'],
        defaults: [{ schema: 'metric', type: 'count' }],
      },
      {
        group: 'buckets',
        name: 'viewBy',
        icon: 'fa fa-eye',
        title: 'View by',
        mustBeFirst: true,
        min: 0,
        max: 1,
        aggFilter: ['terms'],
      },
      {
        group: 'buckets',
        name: 'timeSplit',
        icon: 'fa fa-th',
        title: 'Time field',
        min: 1,
        max: 1,
        aggFilter: ['date_histogram'],
      },
    ]),
  },
};

// register the swimlane definition
visualizations.types.createBaseVisualization(prelertSwimlaneDefinition);
